# Use the official PHP image as the base
FROM php:8.2-fpm

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
COPY . .
RUN composer install --no-dev --optimize-autoloader --no-interaction

# Copy application files
# COPY ./ /var/www

# Copy existing application directory permissions
COPY --chown=www-data:www-data ./ /var/www

# Change current user to www
USER www-data

# Expose port 9000 and start php-fpm server
EXPOSE 9000
CMD ["php-fpm"]
