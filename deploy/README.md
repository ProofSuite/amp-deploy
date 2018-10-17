# AMP Deployment

Currently the only deployment version that is well tested are the staging rinkeby and develop rinkeby
deployment options.

To deploy, you will first need to set environment variables in your shell. You can do so by adding the exports
in the templates/env.sh to your bashprofile, bashrc or zshrc file.

To deploy the **AMP RINKEBY** with the Docker staging branch images:

```bash
./create-aws-ec2.sh
./create-swarm.sh
./create-amp.sh
./deploy-amp.staging-rinkeby.sh
```

To deploy the **AMP RINKEBY** with the Docker development branch images:

```bash
./create-aws-ec2.sh
./create-swarm.sh
./create-amp.sh
./deploy-amp.develop-rinkeby.sh
```
