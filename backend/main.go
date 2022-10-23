package main

import (
	"github.com/fah290944/sa-65-example/controller"
	"github.com/fah290944/sa-65-example/middlewares"

	"github.com/fah290944/sa-65-example/entity"

	"github.com/gin-gonic/gin"
)

func main() {

	entity.SetupDatabase()

	r := gin.Default()

	r.Use(CORSMiddleware())

	api := r.Group("")
	{
		protected := api.Use(middlewares.Authorizes())
		{
			//จัดการข้อมูลแพทย์ หรือ Manage_Information.............
			// Admin Routes
			protected.GET("/admins", controller.ListAdmins)
			protected.GET("/admin/:id", controller.GetAdmin)
			// Doctor Routes
			protected.GET("/doctors", controller.ListDoctors)
			protected.GET("/doctor/:id", controller.GetDoctor)
			protected.POST("/doctors", controller.CreateDoctor)
			// WorkPlace Routes
			protected.GET("/workplaces", controller.ListWorkplaces)
			// MedicalField Routes
			protected.GET("/medicalfields", controller.ListMedicalfield)

			//ระบบยืมเครื่องมือแพทย์ หรือ BorrowMed_Equipment............
			//workplace
			protected.GET("/worklocations", controller.ListWorklocations)
			protected.GET("/worklocation/:id", controller.GetWorklocation)
			//TypeofUse
			protected.GET("/TypeofUses", controller.ListTypeOfUses)
			protected.GET("/TypeofUse/:id", controller.GetTypeOfUse)
			//?edicalEquipments
			protected.GET("/medicalEquipments", controller.ListMedicalEquipments)
			protected.GET("/medicalEquipment/:id", controller.GetMedicalEquipment)
			//Borrow
			protected.GET("/borrows", controller.ListBorrows)
			protected.GET("/borrow/:id", controller.GetBorrow)
			protected.POST("/borrow", controller.CreateBorrow)

			//ระบบบันทึกข้อมูลล่วงเวลา หรือ OverTime................
			// Overtime Routes
			protected.GET("/overtimes", controller.ListOvertimes)
			protected.GET("/overtime/:id", controller.GetOvertime)
			protected.POST("/Overtimes", controller.CreateOvertime)
			// Activity Routes
			protected.GET("/activities", controller.ListActivitys)
			// Workplace Routes
			protected.GET("/Locationworks", controller.ListLocationworks)

			//ระบบผู้ป่วยในการดูแลของแพทย์ หรือ Patient_Doctor.......
			//Patient
			protected.GET("/patients", controller.ListPatients)
			protected.GET("/patients/:id", controller.GetPatient)
			protected.POST("/cpatients", controller.CreatePatient)
			//Symptoms
			protected.GET("/symptoms", controller.ListSymptoms)
			protected.GET("/symptoms/:id", controller.GetSymptoms)
			//Patient_types
			protected.GET("/patient_types", controller.ListPatient_type)
			protected.GET("/patient_types/:id", controller.GetPatientType)

			//ระบบตารางเวลาแพทย์ หรือ Schedule................
			//Location
			protected.GET("/locations", controller.ListLocations)
			protected.GET("/location/:id", controller.GetLocation)
			//medactivity
			protected.GET("/medActivitys", controller.ListMedActivitys)
			protected.GET("/medActivity/:id", controller.GetMedActivity)
			//schedule
			protected.GET("/schedules", controller.ListSchedules)
			protected.GET("/schedule/:id", controller.GetSchedule)
			protected.POST("/saveschedule", controller.CreateSchedule)

			//ระบบลาพักงานของแพทย์ หรือ LeaveMed.............
			//Leave Routes
			protected.GET("/leaves", controller.ListLeave)
			protected.GET("/leaves/:id", controller.GetLeave)
			protected.POST("/leave", controller.CreateLeave)
			//ListType
			protected.GET("/types", controller.ListType)
			//Evidence
			protected.GET("/evidences", controller.ListEvidence)
		}
	}

	// Run the server

	// login User Route Admin
	r.POST("/login", controller.Login)

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
