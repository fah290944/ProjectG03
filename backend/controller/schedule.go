package controller

import (
	"github.com/fah290944/sa-65-example/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

// Schedule----------------------------------------
// POST /schedule //เพิ่มข้อมูลใน DB

func CreateSchedule(c *gin.Context) {

	var schedule entity.Schedule
	var medActivity entity.MedActivity
	var location entity.Location
	var doctor entity.Doctor

	if err := c.ShouldBindJSON(&schedule); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	// ค้นหา medActivity ด้วย id //tx.RowsAffected ตรวจสอบแถว
	if tx := entity.DB().Where("id = ?", schedule.MedActivityID).First(&medActivity); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "MedActivity not found"})
		return
	}

	// ค้นหา workPlace ด้วย id
	if tx := entity.DB().Where("id = ?", schedule.LocationID).First(&location); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Location not found"})
		return
	}

	// ค้นหา doctor ด้วย id
	if tx := entity.DB().Where("id = ?", schedule.DoctorID).First(&doctor); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Doctor not found"})
			return
	}

		// 12: สร้าง schedule
		sd := entity.Schedule{
			Doctor:  doctor,            		 // โยงความสัมพันธ์กับ Entity doctor
			Location: location,                  // โยงความสัมพันธ์กับ workPlace
			MedActivity:    medActivity,         // โยงความสัมพันธ์กับ Entity medactivity
			Time: schedule.Time,
		}
	

	if err := entity.DB().Create(&sd).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": sd})

}

// GET /schedule/:id ดึงข้อมูลเฉพาะตัวที่ต้องการ

func GetSchedule(c *gin.Context) {

	var schedule entity.Schedule

	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM schedules WHERE id = ?", id).Scan(&schedule).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": schedule})

}

// GET /schedule ดึงทั้งหมดใน DB ของตารางเวลา
func ListSchedules(c *gin.Context) {

	var schedule []entity.Schedule

	if err := entity.DB().Preload("Doctor").Preload("Location").Preload("MedActivity").Raw("SELECT * FROM schedules").Find(&schedule).Error; err != nil {
//ดึงตารางย่อยมา .preload
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": schedule})

}

//location--------------------------------
// GET /WorkPlace/:id ดึงข้อมูลเฉพาะตัวที่ต้องการ

func GetLocation(c *gin.Context) {

	var location entity.Location

	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM Locations WHERE id = ?", id).Scan(&location).Error; err != nil {

		   c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		   return

	}
	c.JSON(http.StatusOK, gin.H{"data": location})

}

// GET Location ดึงทั้งหมดใน DB ของ WorkPlace
func ListLocations(c *gin.Context) {

	var location []entity.Location //[] อาเรย์

	if err := entity.DB().Raw("SELECT * FROM  locations").Scan(&location).Error;
		   err != nil {

		   c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		   return

	}
	c.JSON(http.StatusOK, gin.H{"data": location})

}

//medActivity----------------------------------
// GET /medActivity/:id ดึงข้อมูลเฉพาะตัวที่ต้องการ

func GetMedActivity(c *gin.Context) {

	var medActivity entity.MedActivity

	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM med_activities WHERE id = ?", id).Scan(&medActivity).Error; err != nil {

		   c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		   return

	}

	c.JSON(http.StatusOK, gin.H{"data": medActivity})

}

// GET /doctor ดึงทั้งหมดใน DB ของ หมอ
func ListMedActivitys(c *gin.Context) {

	var medActivity []entity.MedActivity

	if err := entity.DB().Raw("SELECT * FROM med_activities").Scan(&medActivity).Error; err != nil {

		   c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		   return

	}

	c.JSON(http.StatusOK, gin.H{"data": medActivity})

}