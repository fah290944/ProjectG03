package controller

import (
	"github.com/fah290944/sa-65-example/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

// POST /overtimes

func CreateOvertime(c *gin.Context) {

	var overtime entity.Overtime
	var activity entity.Activity
	var locationwork entity.Locationwork
	var doctor entity.Doctor

	if err := c.ShouldBindJSON(&overtime); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	// ค้นหา Doctor ด้วย id //tx.RowsAffected ตรวจสอบแถว
	if tx := entity.DB().Where("id = ?", overtime.DoctorID).First(&doctor); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Doctor not found"})
		return
	}

	// ค้นหา Activit ด้วย id
	if tx := entity.DB().Where("id = ?", overtime.ActivityID).First(&activity); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Activity not found"})
		return
	}

	// ค้นหา Workplace ด้วย id
	if tx := entity.DB().Where("id = ?", overtime.LocationworkID).First(&locationwork); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Workplace not found"})
		return
	}
	
	//สร้าง overtime
	sd := entity.Overtime{
		Doctor:  doctor,             // โยงความสัมพันธ์กับ Entity doctor
		Locationwork: locationwork,                  // โยงความสัมพันธ์กับ workPlace
		Activity:    activity,               // โยงความสัมพันธ์กับ Entity medactivity
		Time: overtime.Time,
		Num :  overtime.Num,
	}
	if err := entity.DB().Create(&sd).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}


	c.JSON(http.StatusOK, gin.H{"data": sd})

}

// GET /overtime/:id

func GetOvertime(c *gin.Context) {

	var overtime entity.Overtime

	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM overtimes WHERE id = ?", id).Scan(&overtime).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": overtime})

}

// GET /overtimes
func ListOvertimes(c *gin.Context) {

	var overtimes []entity.Overtime

	if err := entity.DB().Preload("Locationwork").Preload("Doctor").Preload("Activity").Raw("SELECT * FROM overtimes").Find(&overtimes).Error; err != nil {
		//ดึงตารางย่อยมา .preload
		c.JSON(http.StatusBadRequest,gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": overtimes})

}

// GET /activitys
func ListActivitys(c *gin.Context) {

	var activitys []entity.Activity

	if err := entity.DB().Raw("SELECT * FROM activities").Scan(&activitys).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": activitys})

}

// GET /workplaces
func ListLocationworks(c *gin.Context) {

	var locationwork []entity.Locationwork

	if err := entity.DB().Raw("SELECT * FROM locationworks").Scan(&locationwork).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": locationwork})

}