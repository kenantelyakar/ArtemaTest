npm install <br/>
<b> Run for setup(in Typescript/src folder):</b> <br/>
openapi-generator --overwrite  --input resources/service-specs --outputDir apisdk<br/>
<b> Run for deploy(in TypeScript folder):</b> <br/>
npm run deploy<br/>
<b> For Debugging: </b></br>
cf ssh rndbackend -N -T -L 9229:127.0.0.1:9229       