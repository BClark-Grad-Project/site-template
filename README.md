#Node.js Application Baseline SaaS Network
This application is intended to be used with the [site-launchpad charm](https://github.com/BClark-Grad-Project/site-template) for OpenStack with Juju.

When running in scaled configuration HTTP is the primary implementation for this application.  SSL termination and load distribution will be handled by [nginx-proxy](https://github.com/BClark-Grad-Project/nginx-proxy).

If you are running this application from a single server and would like to implement HTTPS uncomment SSL configuration parameters in `server.js` and `app.js`. To lean more about the SSL configuration settings see the [site-secure](https://github.com/BClark-Grad-Project/site-secure) package.

## Dependencies
####Applications 
Node.js & MongoDB.  A list of compatible versions are listed below:

- Node.js v.0.10.36
- MongoDB v.2.4.9

#### Packages (Not on NPM)
The custom package [site-data](https://github.com/BClark-Grad-Project/site-data) is pulled through Github and negotiates all database related information for delivery sent from DBMS. It is recommended that a clone be created for individual applications to associate user data in place of this package. 

##### Service Related
Blog services require AWS API access for S3 storage of blog title images and user images.  SaaS identification located in `app.js` as `service_code` and `service_description` and is set to be integrated with the [site-launchpad charm](https://github.com/BClark-Grad-Project/site-launchpad) but can be set with string parameters.