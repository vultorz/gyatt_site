package main

import (
	"fmt"
	"net/http"
)

func main() {
	http.HandleFunc("/", rukiaFunc)
	http.ListenAndServe("localhost:8080", nil)
}
func rukiaFunc(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "BANKAI!")
}
