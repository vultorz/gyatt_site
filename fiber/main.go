package main

import (
	"log"

	//"github.com/gin-gonic/gin"
	"github.com/gofiber/fiber/v2"
)

func main() {
	app := fiber.New() // create a new Fiber instance

	app.Static("/", "../fiber/views")
	log.Fatal(app.Listen(":3000"))

	//r := gin.Default()
	//r.Static("/", "../fiber/views")
	//r.Static("/Images", "views/Images")

	//log.Fatal(r.Run(":3000"))
}
