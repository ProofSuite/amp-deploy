# See http://www.rabbitmq.com/ssl.html
#
# (c) Stan Angeloff / http://www.gnu.org/licenses/agpl-3.0.html

SHELL := /bin/bash

HOSTNAME ?= $(shell hostname)
PASSPHRASE ?= $(shell cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 32 | head -n 1)

PASSPHRASE_FILE = $(HOSTNAME)/.passphrase

CLIENT_NAME ?= client-1

# ---------------------------------------------------------------------------------------------------------------------

.PHONY: $(HOSTNAME)
$(HOSTNAME): $(HOSTNAME)/ca

$(PASSPHRASE_FILE):
	@mkdir -p $(@D)
	@echo '$(PASSPHRASE)' > $@

$(HOSTNAME)/ca: $(HOSTNAME)/ca/cacert.pem $(HOSTNAME)/ca/cacert.cer $(HOSTNAME)/server/cert.pem $(HOSTNAME)/server/keycert.p12 $(HOSTNAME)/$(CLIENT_NAME)/cert.pem $(HOSTNAME)/$(CLIENT_NAME)/keycert.p12

$(HOSTNAME)/ca/certs:
	mkdir -p $@

$(HOSTNAME)/ca/private:
	mkdir -p $@
	chmod 0750 $@

$(HOSTNAME)/ca/serial:
	echo 01 > $@

$(HOSTNAME)/ca/index.txt:
	touch $@

$(HOSTNAME)/ca/openssl.cnf: $(HOSTNAME)/ca/certs $(HOSTNAME)/ca/private $(HOSTNAME)/ca/serial $(HOSTNAME)/ca/index.txt openssl.cnf.template
	cat $(lastword $^) | sed -e 's/$$HOSTNAME/$(HOSTNAME)/g' -e 's/$$CLIENT_NAME/$(CLIENT_NAME)/g' > $@

$(HOSTNAME)/ca/cacert.pem: $(HOSTNAME)/ca/openssl.cnf
	openssl req -x509 -config $< -newkey rsa:2048 -days 3650 -out $@ -outform PEM -subj /CN=$(HOSTNAME)/ -nodes

$(HOSTNAME)/ca/cacert.cer: $(HOSTNAME)/ca/cacert.pem
	openssl x509 -in $< -out $@ -outform DER

$(HOSTNAME)/server $(HOSTNAME)/$(CLIENT_NAME):
	mkdir $@

.SECONDARY: $(HOSTNAME)/server/key.pem $(HOSTNAME)/$(CLIENT_NAME)/key.pem
$(HOSTNAME)/%/key.pem: $(HOSTNAME)/%
	openssl genrsa -out $@ 2048

.SECONDARY: $(HOSTNAME)/server/req.pem $(HOSTNAME)/$(CLIENT_NAME)/req.pem
$(HOSTNAME)/%/req.pem: $(HOSTNAME)/%/key.pem
	openssl req -new -key $< -out $@ -outform PEM -subj /CN=$(HOSTNAME)/O=$(shell basename $(@D))/ -nodes

$(HOSTNAME)/%/cert.pem: $(HOSTNAME)/ca/openssl.cnf $(HOSTNAME)/%/req.pem
	openssl ca -config $(firstword $^) -in $(lastword $^) -out $@ -notext -batch -extensions $(shell basename $(@D))_ca_extensions

$(HOSTNAME)/%/keycert.p12: $(HOSTNAME)/%/key.pem $(PASSPHRASE_FILE) $(HOSTNAME)/%/cert.pem
	openssl pkcs12 -export -out $@ -in $(lastword $^) -inkey $(firstword $^) -passout file:$(PASSPHRASE_FILE)

# ---------------------------------------------------------------------------------------------------------------------

.PHONY: export
export: $(HOSTNAME)
	mkdir $(HOSTNAME)/export
	mkdir $(HOSTNAME)/export/ca
	mkdir $(HOSTNAME)/export/ca/private
	mkdir $(HOSTNAME)/export/server
	mkdir $(HOSTNAME)/export/$(CLIENT_NAME)
	cp $(HOSTNAME)/ca/cacert.pem $(HOSTNAME)/export/ca/
	cp $(HOSTNAME)/ca/private/cakey.pem $(HOSTNAME)/export/ca/private/
	cp $(HOSTNAME)/server/key.pem $(HOSTNAME)/server/cert.pem $(HOSTNAME)/export/server/
cp $(HOSTNAME)/$(CLIENT_NAME)/key.pem $(HOSTNAME)/$(CLIENT_NAME)/cert.pem $(HOSTNAME)/export/$(CLIENT_NAME)/