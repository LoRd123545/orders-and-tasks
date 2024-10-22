# TECH STACK

Following technologies have been used to create this app:

- [nodejs](https://nodejs.org/)
- [react](https://react.dev/)
- [javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [typescript](https://www.typescriptlang.org/)
- [docker](https://www.docker.com/)
- [nginx](https://nginx.org/)
- [rabbitmq](https://www.rabbitmq.com/)
- [mailersend](https://www.mailersend.com/)
- [postgreSQL](https://www.postgresql.org/)

# SYSTEM DESIGN

## OVERVIEW

![diagram describing system design](./images/architecture.png 'system design')

Image above describes system design of application. If for some reason image is not avaiable here's a description:

Client apps (for now orders app and tasks app) query and connect to api gateway (nginx) and are not aware of backend infrastructure. On the backend side there are 5 services as for now:

- reports
- tasks
- orders
- products
- emails

Each service has it's own database (postgresql) except emails (It's just a wrapper around mailersend api)

There is also message broker (rabbitmq) which is used for asynchronous and event based communication beetwen services.

## COMMUNICATION

### FRONTEND

As mentioned in previous section, client apps are not aware of backend infrastructure, so they communicate with it through api gateway.

### BACKEND

On the backend side, there is no one way of communication. Services talk to each other either directly or through message broker (depends on need)

### MESSAGE BROKER

#### OVERVIEW

When it comes to asynchronous communication, message broker is used. Single exchange of type fanout is created (This means that all messages that are sent to that exchange are routed to all queues that are bound to it).

#### PUBLISHING EVENTS

Every service that needs to publish message connects to broker and sends message to exchange.

#### RECEIVING EVENTS

On ther other hand every service that needs to listen for specific events, connects to broker and listens for messages on specific queue.
