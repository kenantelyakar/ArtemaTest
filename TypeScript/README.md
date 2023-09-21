Run for setup:
openapi-generator --overwrite  --input resources/service-specs --outputDir apisdk
Run for deploy: 
npm run build
cf8 push