# define an alias for the specific Python version used in this file
FROM python:3.11.6-slim-bullseye as python

# Python build stage
FROM python as python-build-stage

ARG BUILD_ENVIRONMENT=production

# Install apt packages
RUN apt-get update && apt-get install --no-install-recommends -y \
  # dependencies for building Python packages
  build-essential \
  # psycopg2 dependencies
  libpq-dev

# Requirements are installed here to ensure they will be cached
COPY ./backend/requirements .

# Create Python dependency and sub-dependency wheels
RUN pip wheel --wheel-dir /usr/src/app/wheels \
  -r ${BUILD_ENVIRONMENT}.txt


# Python 'run' stage
FROM python as python-run-stage

ARG BUILD_ENVIRONMENT=production
ARG APP_HOME=/app

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1
ENV BUILD_ENV ${BUILD_ENVIRONMENT}

WORKDIR ${APP_HOME}

RUN mkdir ${APP_HOME}/staticfiles

RUN addgroup --system django \
  && adduser --system --ingroup django django


# Install required system dependencies
RUN apt-get update && apt-get install --no-install-recommends -y \
  # psycopg2 dependencies
  libpq-dev \
  # cleaning up unused files
  && apt-get purge -y --auto-remove -o APT::AutoRemove::RecommendsImportant=false \
  && rm -rf /var/lib/apt/lists/*

# copy Python dependency wheels from python-build-stage
COPY --from=python-build-stage /usr/src/app/wheels /wheels/

# use wheels to install python dependencies
RUN pip install --no-cache-dir --no-index --find-links=/wheels/ /wheels/* \
  && rm -rf /wheels/

# copy entrypoint script
COPY --chown=django:django ./compose/production/django/entrypoint /entrypoint
# remove Windows return characters from end of lines
RUN sed -i 's/\r$//g' /entrypoint
RUN chmod +x /entrypoint

# copy start script
COPY --chown=django:django ./compose/production/django/start /start
# remove Windows return characters from end of lines
RUN sed -i 's/\r$//g' /start
RUN chmod +x /start

# copy application code to WORKDIR
COPY --chown=django:django ./backend ${APP_HOME}

USER django

# This script will always run when container is started
ENTRYPOINT ["/entrypoint"]