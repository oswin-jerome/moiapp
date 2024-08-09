# Use the official PHP image as the base
FROM php:8.2-fpm
RUN apt-get update && apt-get install -y nodejs npm

# Set working directory
WORKDIR /var/www

# Install system dependencies
RUN apt-get update && apt-get install -y \
	git \
	unzip \
	libpng-dev \
	libjpeg-dev \
	libfreetype6-dev \
	zip \
	&& docker-php-ext-configure gd --with-freetype --with-jpeg \
	&& docker-php-ext-install gd \
	&& docker-php-ext-install pdo pdo_mysql

# Install Composer
COPY --from=composer:2.2 /usr/bin/composer /usr/bin/composer

# Copy existing application directory contents
COPY . /var/www

# Install application dependencies
RUN composer install --no-dev --optimize-autoloader --no-interaction


RUN npm install
RUN npm run build

# Change the ownership of our applications
RUN chown -R www-data:www-data /var/www

# Expose port 9000 and start php-fpm server
EXPOSE 9000
CMD ["php-fpm"]
