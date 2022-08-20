exports.up = async function (knex) {
    await knex.schema.createTable('projects', (tbl) => {
      tbl.increments('project_id')
      tbl.varchar('project_name', 128).notNullable()
      tbl.varchar('project_description', 128)
      tbl.boolean('project_completed').notNullable().defaultTo(0)
    })
  
    await knex.schema.createTable('resources', (tbl) => {
      tbl.increments('resource_id')
      tbl.varchar('resource_name', 128).notNullable().unique()
      tbl.varchar('resource_description', 128)
    })
  
    await knex.schema.createTable('tasks', (tbl) => {
      tbl.increments('task_id')
      tbl.varchar('task_description', 128).notNullable()
      tbl.varchar('task_notes', 128)
      tbl.boolean('task_completed').notNullable().defaultTo(0)
      tbl
        .integer('project_id')
        .unsigned()
        .notNullable()
        .references('project_id')
        .inTable('projects')
        .onDelete('CASCADE')
    })
  
    await knex.schema.createTable('project_resources', (tbl) => {
      tbl.increments('project_resource_id')
      tbl
        .integer('project_id')
        .unsigned()
        .notNullable()
        .references('project_id')
        .inTable('projects')
        .onDelete('CASCADE')
      tbl
        .integer('resource_id')
        .unsigned()
        .notNullable()
        .references('resource_id')
        .inTable('resources')
        .onDelete('CASCADE')
    })
  }
  
  exports.down = async function (knex) {
    await knex.schema.dropTableIfExists('project_resources')
    await knex.schema.dropTableIfExists('tasks')
    await knex.schema.dropTableIfExists('resources')
    await knex.schema.dropTableIfExists('projects')
  }