package main

import (
	"crypto/sha256"
	"encoding/hex"
	"fmt"
)

// will be put in a seperate file from database
var shauser = ""
var shapass = ""

func main() {
	createAccount()
	login()
}

func createAccount() {
	username := ""
	password := ""

	fmt.Println("Make an account")
	fmt.Println("")
	fmt.Print("Enter a username: ")
	fmt.Scan(&username)

	//is basically useless unless reached using exploits in the language
	nilChecker(username)

	fmt.Print("Enter a password: ")
	fmt.Scan(&password)

	//is useless
	nilChecker(password)

	makeUser(username)
	makePassword(password)

	fmt.Println()
	fmt.Println("Account created! Please sign in: ")

}
func login() {
	username := ""
	password := ""
	fmt.Println()
	fmt.Print("Username: ")
	fmt.Scan(&username)
	fmt.Print("Password: ")
	fmt.Scan(&password)
	if encrypt(username) != shauser || encrypt(password) != shapass {
		fmt.Println()
		fmt.Println("Incorrect login, please try again. ")
		fmt.Println()
		login()
	} else {
		fmt.Println("Signed in!")
	}
}

func encrypt(input string) string {
	//SHA256 Hashing Encryption
	plainText := []byte(input)
	sha256Hash := sha256.Sum256(plainText)
	return hex.EncodeToString(sha256Hash[:])
}
func nilChecker(username string) {
	for username == "\n" {
		fmt.Println("Invalid Username. Try again.")
		fmt.Scan(&username)
		if username != "" {
			break
		}
	}
}
func makeUser(username string) {
	shauser = encrypt(username)
}
func makePassword(password string) {
	shapass = encrypt(password)
}
