# Use the official PHP image as the base
FROM node:latest AS node
FROM php:8.2-fpm

COPY --from=node /usr/local/lib/node_modules /usr/local/lib/node_modules
COPY --from=node /usr/local/bin/node /usr/local/bin/node
RUN ln -s /usr/local/lib/node_modules/npm/bin/npm-cli.js /usr/local/bin/npm

# Set working directory
WORKDIR /var/www

# Install system dependencies
RUN apt-get update && apt-get install -y \
	git \
	curl \
	libpng-dev \
	libjpeg-dev \
	libfreetype6-dev \
	zip \
	unzip \
	&& docker-php-ext-configure gd --with-freetype --with-jpeg \
	&& docker-php-ext-install gd pdo pdo_mysql

# Install Composer
COPY --from=composer:2.5 /usr/bin/composer /usr/bin/composer

# Copy and install Composer dependencies
COPY . /var/www
RUN composer install --no-dev --optimize-autoloader --no-interaction
# RUN npm i
# RUN npm run build

# Copy existing application directory contents


# Copy existing application directory permissions
COPY --chown=www-data:www-data . /var/www
RUN chown -R www-data:www-data /var/www
# Change current user to www
USER www-data

# Expose port 9000 and start php-fpm server
EXPOSE 9000
CMD ["php-fpm"]
