# eStudent - RTI

School project - subject Internet Application Programming, february 2021.

Web application that represents system for managing subjects at department of Computer Engineering and Information Theory.

## Description

## Instalation
Install node.js.
Instal angular 10.1.6 with following command:\
`npm install -g @angular/cli@10.1.6` 

Create two folders, frontend and backend.\
In command prompt locate in frontend folder. For creating new app type:
```
ng new app
routing? YES, CSS
```

In command prompt locate in backend folder. Type:\
```
npm install express
npm install body-parser
npm install cors
npm install mongoose or npm install mongodb (native driver)
npm install typescript
```
\	
Replace files from frontend/app/src with files from frontend/src from my project.\
Replace files from backend/src with files from backend/src from my project.

In mongodb insert database stored in mongodb repositorium.


Starting the application:\
Running frontend:\
`ng serve --open`\
\
Running backend:\
```
npm install typescript
tsc
npm run serve	
```
	
Running application demands internet connection, beacouse of Bootstrap CDN.	

	
### Built with
Frontend:
- Angular 10.1.6
- Bootstrap 4.4.1

Backend:
- Node.js with Express framework
- MongoDB

### Author
- Aleksandra Bogicevic - @alebogi
