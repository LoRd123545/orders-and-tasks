# IMPORTANT

This api is not ready for production yet and it is not secure. It **doesn't** support authorization which is crucial for enterprise

Every endpoint is prefixed with this url: `/api/tasks/v1/tasks`

Default port for api gateway is `80`, default host is `localhost` and default protocol is `http`

Every date is in UTC format

# TASK

## task schema

|    property |         type |
| ----------: | -----------: |
|          id |      uuid v4 |
|        name |   string(50) |
|   createdAt |    timestamp |
|   updatedAt |    timestamp |
|      status | **status\*** |
|       dueTo |    timestamp |
| description |  string(500) |

## status enum

- not-started
- in-progress
- done

# ENDPOINTS

## GET /

### DESCRIPTION

This route is responsible for retrieving all tasks. It also supports simple filtering, sorting and pagination

### REQUEST

#### QUERY PARAMS

|   param |                              value |                               description | required |   default |
| ------: | ---------------------------------: | ----------------------------------------: | -------: | --------: |
|   limit |                            integer |                    limits number of tasks |    false |        10 |
|    page |                            integer |                               page number |    false |         0 |
| orderBy | task property (see above), default | property by which tasks should be ordered |    false | createdAt |
|  sortBy |                        asc or desc |                            sorting method |    false |      desc |

### RESPONSE

#### SAMPLE RESPONSE

```json
[
  {
    "id": "912bb8d3-7f32-41d6-8909-8970a35b8223",
    "name": "task-3483",
    "description": null,
    "status": "in-progress",
    "dueTo": "2024-10-23T12:06:59.129Z",
    "createdAt": "2024-10-22T12:06:59.130Z",
    "updatedAt": "2024-10-22T12:06:59.130Z"
  },
  {
    "id": "73dfb12c-e5ce-4b87-a6e7-553067c12559",
    "name": "task-9372",
    "description": null,
    "status": "done",
    "dueTo": "2024-10-23T12:06:52.701Z",
    "createdAt": "2024-10-22T12:06:52.702Z",
    "updatedAt": "2024-10-22T12:06:52.702Z"
  },
  {
    "id": "8b3b185f-3f6c-4741-a116-38e54142e1d9",
    "name": "task-1241",
    "description": null,
    "status": "not-started",
    "dueTo": "2024-10-23T12:06:47.938Z",
    "createdAt": "2024-10-22T12:06:47.938Z",
    "updatedAt": "2024-10-22T12:06:47.938Z"
  }
]
```

## POST /filters

### DESCRIPTION

This route is mainly responsible for advanced filtering of tasks. It also supports sorting and pagination

### REQUEST

#### BODY

|     key |               value |                               description | required |   default |
| ------: | ------------------: | ----------------------------------------: | -------: | --------: |
|   limit |             integer |                    limits number of tasks |    false |        10 |
|    page |             integer |                               page number |    false |         0 |
| orderBy | **task property\*** | property by which tasks should be ordered |    false | createdAt |
|  sortBy |         asc or desc |                            sorting method |    false |      desc |
|   where |  **where schema\*** |                 fields to filter tasks by |    false |           |

##### WHERE SCHEMA

|  property |                       value |     description | required |
| --------: | --------------------------: | --------------: | -------: |
|      name |                  string(50) |       task name |    false |
| createdAt |        date or date filters |   creation date |    false |
| updatedAt |        date or date filters |       edit date |    false |
|    status | status or array of statuses | task status(es) |    false |
|     dueTo |  date or **date filters\*** |   task due date |    false |

##### DATE FILTERS

| property | value |   description | required |                    default |
| -------: | ----: | ------------: | -------: | -------------------------: |
|    start |  date | starting date |    false | beggining of current month |
|      end |  date |   ending date |    false |       end of current month |

### RESPONSE

#### SAMPLE RESPONSE

```json
[
  {
    "id": "912bb8d3-7f32-41d6-8909-8970a35b8223",
    "name": "task-3483",
    "description": null,
    "status": "in-progress",
    "dueTo": "2024-10-23T12:06:59.129Z",
    "createdAt": "2024-10-22T12:06:59.130Z",
    "updatedAt": "2024-10-22T12:06:59.130Z"
  },
  {
    "id": "8b3b185f-3f6c-4741-a116-38e54142e1d9",
    "name": "task-1241",
    "description": null,
    "status": "not-started",
    "dueTo": "2024-10-23T12:06:47.938Z",
    "createdAt": "2024-10-22T12:06:47.938Z",
    "updatedAt": "2024-10-22T12:06:47.938Z"
  }
]
```

## GET /:id

### DESCRIPTION

This route is responsible for retrieving single task

### REQUEST

#### PARAMS

| param |   value | description | required |
| ----: | ------: | ----------: | -------: |
|    id | uuid v4 |     task id |     true |

### RESPONSE

#### SAMPLE RESPONSE

```json
{
  "id": "8b3b185f-3f6c-4741-a116-38e54142e1d9",
  "name": "task-1241",
  "description": null,
  "status": "not-started",
  "dueTo": "2024-10-23T12:06:47.938Z",
  "createdAt": "2024-10-22T12:06:47.938Z",
  "updatedAt": "2024-10-22T12:06:47.938Z"
}
```

## POST /

### DESCRIPTION

This route is responsible for creating task

### REQUEST

#### BODY

|         key |       value |      description | required |              default |
| ----------: | ----------: | ---------------: | -------: | -------------------: |
|        name |  string(50) |        task name |     true |                      |
|      status |      status |      task status |    false |          not-started |
|       dueTo |        date |    task due date |    false | current date + 1 day |
| description | string(500) | task description |    false |                 null |

### RESPONSE

#### SAMPLE RESPONSE

```json
{
  "id": "8b3b185f-3f6c-4741-a116-38e54142e1d9",
  "name": "task-1241",
  "description": null,
  "status": "not-started",
  "dueTo": "2024-10-23T12:06:47.938Z",
  "createdAt": "2024-10-22T12:06:47.938Z",
  "updatedAt": "2024-10-22T12:06:47.938Z"
}
```

## PATCH /:id

### DESCRIPTION

This route is responsible for updating task

### REQUEST

#### PARAMS

| param |   value | description | required |
| ----: | ------: | ----------: | -------: |
|    id | uuid v4 |     task id |     true |

#### BODY

|         key |       value |      description | required |
| ----------: | ----------: | ---------------: | -------: |
|        name |  string(50) |        task name |    false |
|      status |      status |      task status |    false |
|       dueTo |        date |    task due date |    false |
| description | string(500) | task description |    false |

### RESPONSE

#### SCHEMA

status 200 if successful, 404 if task was not found, 500 if there was a server error

## DELETE /:id

### DESCRIPTION

This route is responsible for deleting single task

### REQUEST

#### PARAMS

| param |   value | description | required |
| ----: | ------: | ----------: | -------: |
|    id | uuid v4 |     task id |     true |

### RESPONSE

#### SCHEMA

status 200 if successful, 404 if task was not found, 500 if there was a server error
