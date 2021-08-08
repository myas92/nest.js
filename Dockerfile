FROM node:14

# Create app directory 
# این مسیر پروژه در داخل کانتینر ساخته شده از ایمیج می باشد
WORKDIR /yaser/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

#اینجا باید بگیم از پروژه بیلد گرفته شود 
RUN npm run build

EXPOSE 8080
# وقتی از پروژه بیلد گرفته می شود باید به مسیر سورس رفته و فایل مین اجرا شود
# node dist/main.js
CMD [ "node", "dist/main.js" ]