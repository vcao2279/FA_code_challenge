exports.up = function(knex, Promise) {
  return knex.createTable("users", function(tbl) {
    tbl.increment();
    tbl.string("name", 255).notNullable();
    tbl.string("phone", 10);
    tbl.string("email", 255);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users");
};
