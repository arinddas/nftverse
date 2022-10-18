FROM nginx:1.21.0-alpine
EXPOSE 80
COPY ./dist/nftverse /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]