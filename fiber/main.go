package main

import "github.com/gofiber/fiber/v2"

func main() {
	// fiber app
	app := fiber.New()

	//configuring app
	app.Static("/", "./public")

	// routes
	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, World!")
	})
	//starter
	app.Listen(":3000")
}
