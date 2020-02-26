package controllers

import java.sql.DriverManager

import javax.inject.Inject
import play.api.db._
import play.api.libs.json.{JsObject, Json}
import play.api.mvc._

class ScalaDB @Inject()(db: Database, val controllerComponents: ControllerComponents) extends BaseController {

  def addClub(): Action[AnyContent] = Action {
    request => {
      db.withConnection { conn =>
        val cl = request.body.asJson.get.toString()
        val st = conn.createStatement()
        val club = Json.parse(cl)
        val n = (club \ "clubName").get.as[String]
        val mbrs = (club \ "members").get.as[List[JsObject]]
        var m = ""
        for (mbr <- mbrs){
          println((mbr \ "name").get.as[String])
          m = m ++ (mbr \ "name").get.as[String] + ","
        }
          val query = s"INSERT INTO clubs (name, members) VALUES ('$n', '$m');"
          st.executeUpdate(query)
          Ok("Row added.")
      }
    }
  }

  def getClubs(): Action[AnyContent] = Action {
    db.withConnection { conn =>
      var dict = Json.obj()
      val st = conn.createStatement()
      val res = st.executeQuery("SELECT name, members FROM clubs")
      var json_response = Json.obj()
      while (res.next()) {
        dict = dict.deepMerge(Json.obj(res.getString("name") -> (res.getString("members").split(","))))
      }
      Ok(Json.obj("clubs" -> Json.arr(dict)))
    }
  }

}
