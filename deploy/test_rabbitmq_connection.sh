openssl s_client -connect 52.79.154.183:5671 \
    -cert ${AMP_CERTS_PATH}/client_certificate.pem \
    -key ${AMP_CERTS_PATH}/client_key.pem \
    -CAfile ${AMP_CERTS_PATH}/server_certificate.pem