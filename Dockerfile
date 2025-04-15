# Imagen base de Node.js
FROM node:18-alpine

# Directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto de los archivos del proyecto
COPY . .

# Exponer el puerto
EXPOSE 3000

# Modificamos el comando para usar el puerto 3000
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "3000"] 