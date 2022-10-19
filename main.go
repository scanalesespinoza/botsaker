package main

import (
    "chat"
	"io/ioutil"
	"log"
    "net/http"
	"github.com/gin-gonic/autotls"
    "github.com/gin-gonic/gin"
    "testing"
	"github.com/Davincible/gotiktoklive"
)
func main() {
initBotsaker()
router := gin.Default()
router.GET("/users", getusers)
router.POST("/users", postusers)

log.Fatal(autotls.Run(router, "botsaker.battlebit.org", "botsaker2.battlebit.org"))
}
func getusers(c *gin.Context) {
	c.String(http.StatusOK, "pong")
}
func postusers(c *gin.Context) {
	body, _ := ioutil.ReadAll(c.Request.Body)
    println(string(body))
	c.String(http.StatusOK, "pong")
}
