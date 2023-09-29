#If you try at SAP BTP Trial account all CF services have been stopped at every 24 hours
#this .sh script for restart all services.
cf8 login && cf8 start EczViewPlugins && cf8 start rndbackend