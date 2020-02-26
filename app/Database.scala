import java.sql.Connection

class Database {

  /** Create a clubs table for testing with. */
  def createClubsTable()(implicit conn: Connection): Unit = createTable("clubs", "name varchar", "members varchar")

  private def createTable(name: String, columns: String*)(implicit conn: Connection): Unit = conn.createStatement().execute("create table " + name + " ( " + columns.mkString(", ") + ");")

}
