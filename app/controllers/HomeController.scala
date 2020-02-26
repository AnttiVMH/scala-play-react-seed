package controllers

import javax.inject._

import play.api.libs.json.Json
import play.api.mvc._
import play.api.db._

@Singleton
class HomeController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {

  def appSummary = Action {
    Ok(Json.obj("content" -> "Club App!"))
  }

  def testRoute = Action {
    Ok("10")
  }


  def clubSummary = Action {
    Ok(Json.obj("clubs" -> Json.arr(Json.obj("myClub" -> List[String]("Antti")))))
  }
}
