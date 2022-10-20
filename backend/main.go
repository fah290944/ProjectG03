package main

 

import (

  "github.com/fah290944/sa-65-example/controller"

  "github.com/fah290944/sa-65-example/entity"

  "github.com/gin-gonic/gin"

)

 

func main() {

  entity.SetupDatabase()

  r := gin.Default()

  r.Use(CORSMiddleware())

  // Doctor Routes

  r.GET("/doctors", controller.ListDoctors)
  r.GET("/doctor/:id", controller.GetDoctor)
  r.POST("/doctors", controller.CreateDoctor)

  //workplace
  r.GET("/workPlace", controller.ListWorkPlaces)
  r.GET("/workPlace/:id", controller.GetWorkPlace)
 

  //medactivity
  r.GET("/medActivitys", controller.ListMedActivitys)
  r.GET("/medActivity/:id", controller.GetMedActivity)

  //schedule
  r.GET("/schedules", controller.ListSchedules)
  r.GET("/schedule/:id", controller.GetSchedule)
  r.POST("/saveschedule", controller.CreateSchedule)

  // Run the server

  r.Run()

}

func CORSMiddleware() gin.HandlerFunc {

  return func(c *gin.Context) {

        c.Writer.Header().Set("Access-Control-Allow-Origin", "*")

        c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")

        c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")

        c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE, PATCH")

 

        if c.Request.Method == "OPTIONS" {

          c.AbortWithStatus(204)

          return

        }

 

        c.Next()

  }

}