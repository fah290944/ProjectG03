package controller

import (


	"github.com/fah290944/sa-65-example/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

func CreateLeave(c *gin.Context) {

	var evidence entity.Evidence
	var ttype entity.Type
	var leave entity.Leave
	var doctor entity.Doctor

	if err := c.ShouldBindJSON(&leave); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	// ค้นหา Type ด้วย id //tx.RowsAffected ตรวจสอบแถว
	if tx := entity.DB().Where("id = ?", leave.TypeID).First(&ttype); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Type not found"})
		return
	}

	// ค้นหา Evidence ด้วย id
	if tx := entity.DB().Where("id = ?", leave.EvidenceID).First(&evidence); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Evidence not found"})
		return
	}

	// ค้นหา doctor ด้วย id
	if tx := entity.DB().Where("id = ?", leave.DoctorID).First(&doctor); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Doctor not found"})
			return
	}

		// 12: สร้าง Leave
		ld := entity.Leave{
			Doctor:		doctor,  
			Type: 		ttype,
			Reason:		leave.Reason,
			Fdate:		leave.Fdate,
			Ldate:		leave.Ldate,
			Evidence:	evidence,

	            // โยงความสัมพันธ์กับ Entity doctor
		}
	

	if err := entity.DB().Create(&ld).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": ld})

}

// GET /user/:id

func GetLeave(c *gin.Context) {

	var leave entity.Leave

	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM leaves WHERE id = ?", id).Scan(&leave).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": leave})

}


func ListLeave(c *gin.Context) {

	var leave []entity.Leave

	if err := entity.DB().Preload("Doctor").Preload("Evidence").Preload("Type").Raw("SELECT * FROM leaves").Find(&leave).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": leave})

}
func ListType(c *gin.Context) {

	var typ []entity.Type

	if err := entity.DB().Raw("SELECT * FROM Types").Scan(&typ).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": typ})

}
func ListEvidence(c *gin.Context) {

	var ev []entity.Evidence

	if err := entity.DB().Raw("SELECT * FROM evidences").Scan(&ev).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": ev})

}