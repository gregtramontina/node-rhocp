FROM registry.access.redhat.com/ubi8/ubi:8.0

LABEL name="My nodejs test app" \
      version="1.0.0" \
      release="ABC" \
      summary="This is just a nodejs test app" \
      description="A nodejs test app to use when studying for the OpenShift certification." \
      io.k8s.description="A nodejs test app to use when studying for the OpenShift certification." \
      io.k8s.name="NodeJS Test" \
      io.k8s.display-name="NodeJS Test App" \
      io.openshift.expose-services="12944:12944" \
      io.openshift.tags="node,nodejs,test" \
      maintainer="Gregorio Tramontina"

WORKDIR /usr/app/
COPY *.js *.json ./

USER 0

RUN yum install -y --disableplugin=subscription-manager nodejs && \
    yum clean all && \
    npm install

EXPOSE 12944

USER 1001

CMD ["npm", "start"]

