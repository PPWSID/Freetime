package main

import (
	"fmt"
	"free-back-golang/config"
	"free-back-golang/controller"
	"free-back-golang/database"
	"free-back-golang/repository"
	"free-back-golang/routes"
	"free-back-golang/service"

	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	cfg, _ := config.SetConfig()
	app := fiber.New()

	// ✅ เพิ่ม CORS middleware โดยใช้ config จาก .env
	app.Use(cors.New(cors.Config{
		AllowOrigins: cfg.App.Cors.AllowOrigins,
		AllowHeaders: "Origin, Content-Type, Accept, Authorization",
		AllowMethods: "GET, POST, PUT, DELETE, OPTIONS",
	}))

	// ✅ Connect MongoDB
	db, err := database.ConnectMongo(*cfg)
	if err != nil {
		log.Fatalf("MongoDB connection error: %v", err)
	}

	testRepo := repository.NewtestRepositoryDB(db)
	testService := service.NewtestService(testRepo)
	testHandler := controller.NewtestController(testService)
	routes.TestRoutes(app, cfg, testHandler)

	port := cfg.App.Port
	fmt.Println("Start the server on port :" + port + " ✅")
	app.Listen(":" + port)

}
