package main

import (
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/template/html/v2"
)

func main() {
	// Initialize standard Go html template engine
	engine := html.New("./views", ".html")
	// If you want other engine, just replace with following
	// Create a new engine with django
	// engine := django.New("./views", ".django")

	app := fiber.New(fiber.Config{
		Views: engine,
	})

	//config app

	app.Get("/", func(c *fiber.Ctx) error {
		// Render index template
		return c.Render("index", fiber.Map{
			"Name": "Yhwach Solos",
		})
	})

	log.Fatal(app.Listen(":3000"))
}
