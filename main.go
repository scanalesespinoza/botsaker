package main

import (
	"log"
    "net/http"
	"github.com/gin-gonic/autotls"
    "github.com/gin-gonic/gin"
)

type user struct {
    id     string  `json:"id"`
    name  string  `json:"name"`
    level string  `json:"level"`
    exp  float64 `json:"exp"`
}
var users = []user{
    {id: "1", name: "Blue Train", level: "John Coltrane", exp: 56.99},
    {id: "2", name: "Jeru", level: "Gerry Mulligan", exp: 17.99},
    {id: "3", name: "Sarah Vaughan and Clifford Brown", level: "Sarah Vaughan", exp: 39.99},
}

func main() {
router := gin.Default()
router.GET("/users", getusers)
router.POST("/users", postusers)

router.Run("0.0.0.0:8080")

log.Fatal(autotls.Run(r, "botsaker.battlebit.org", "botsaker2.battlebit.org"))
}
func getusers(c *gin.Context) {
    c.IndentedJSON(http.StatusOK, users)
}
func postusers(c *gin.Context) {
    var newuser user

    // Call BindJSON to bind the received JSON to
    // newuser.
    //if err := c.BindJSON(&newuser); err != nil {
    //    return
    //}

    // Add the new user to the slice.
    //users = append(users, newuser)
    //c.IndentedJSON(http.StatusCreated, newuser)
	body, _ := ioutil.ReadAll(c.Request.Body)
    println(string(body))
	c.String(http.StatusOK, "pong")
}