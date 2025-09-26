package routes

import (
	"free-back-golang/config"
	"free-back-golang/controller"

	"github.com/gofiber/fiber/v2"
)

func TestRoutes(app fiber.Router, cfg *config.Config, testHandler *controller.TestController) {
	testGroup := app.Group("/test")
	testGroup.Get("", testHandler.TestController)

}
