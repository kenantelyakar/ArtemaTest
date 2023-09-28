<h3><b> 1.Install all dependencies:</b></h3> 
<i>npm install </i>
<h3><b> 2.Run for setup(in Typescript/src folder):</b></h3> 
<i>openapi-generator --overwrite  --input resources/service-specs --outputDir apisdk</i><br/>
<h3><b> 3.Run for deploy(in TypeScript folder):</b> </h3>
<i>npm run deploy</i><br/>
<h3><b> *For Debugging: </b></h3>
<i>cf ssh rndbackend -N -T -L 9229:127.0.0.1:9229   </i>  
<h5>After run the command in terminal:</h5>
**Debug breakpoints should be at builded *.js files.
<img src="../img/img.png">
<img src="../img/img_5.png">
<h3><b> *For connect to postgresql :</b></h3>
<i>cf ssh rndbackend  -L 3951:&lt;DBHostname&gt;:&lt;DBPort&gt; </i>
<h5>After run the command in terminal:</h5>
<img src="../img/img_1.png">
<img src="../img/img_2.png">
<img src="../img/img_3.png">
<img src="../img/img_4.png">
