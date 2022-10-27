package controller

import (
	"net/http"

	"github.com/fah290944/sa-65-example/entity"
	"github.com/gin-gonic/gin"
)

// borrow............................
func CreateBorrow(c *gin.Context) {

	var borrow entity.Borrow
	var medicalEquipment entity.MedicalEquipment
	var worklocation entity.Worklocation
	var doctor entity.Doctor

	if err := c.ShouldBindJSON(&borrow); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	// ค้นหา medActivity ด้วย id //tx.RowsAffected ตรวจสอบแถว
	if tx := entity.DB().Where("id = ?", borrow.MedicalEquipmentID).First(&medicalEquipment); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "MedicalEquipment not found"})
		return
	}

	// ค้นหา worklocation ด้วย id
	if tx := entity.DB().Where("id = ?", borrow.WorklocationID).First(&worklocation); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "worklocation not found"})
		return
	}

	// ค้นหา doctor ด้วย id
	if tx := entity.DB().Where("id = ?", borrow.DoctorID).First(&doctor); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Doctor not found"})
		return
	}

	// 12: สร้าง schedule
	br := entity.Borrow{
		Doctor:           doctor,       // โยงความสัมพันธ์กับ Entity doctor
		Worklocation:     worklocation, // โยงความสัมพันธ์กับ workPlace
		MedicalEquipment: medicalEquipment,
		Quant:            borrow.Quant, // โยงความสัมพันธ์กับ Entity medactivity
		BorrowDate:       borrow.BorrowDate,
		ReturnDate:       borrow.ReturnDate,
	}

	if err := entity.DB().Create(&br).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": br})

}

// GET /Borrow/:id ดึงข้อมูลเฉพาะตัวที่ต้องการ

func GetBorrow(c *gin.Context) {

	var borrow entity.Borrow

	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM borrows WHERE id = ?", id).Scan(&borrow).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": borrow})

}

// GET /Borrow ดึงทั้งหมดใน DB ของตารางเวลา
func ListBorrows(c *gin.Context) {

	var borrow []entity.Borrow

	if err := entity.DB().Preload("Doctor").Preload("Worklocation").Preload("MedicalEquipment.TypeofUse").Raw("SELECT * FROM borrows").Find(&borrow).Error; err != nil {
		//ดึงตารางย่อยมา .preload
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": borrow})

}

// WorkPlace// GET /:id ดึงข้อมูลเฉพาะตัวที่ต้องการ
func GetWorklocation(c *gin.Context) {

	var worklocation entity.Worklocation

	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM worklocations WHERE id = ?", id).Scan(&worklocation).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": worklocation})

}

// GET /WorkPlace ดึงทั้งหมดใน DB ของ WorkPlace
func ListWorklocations(c *gin.Context) {

	var worklocation []entity.Worklocation //[] อาเรย์

	if err := entity.DB().Raw("SELECT * FROM Worklocations").Scan(&worklocation).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": worklocation})

}

// MedicalEquipments................................
func GetMedicalEquipment(c *gin.Context) {

	var medicalEquipment entity.MedicalEquipment

	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM medical_equipments WHERE id = ?", id).Scan(&medicalEquipment).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": medicalEquipment})

}

// GET /MedicalEquipments ดึงทั้งหมดใน DB ของ หมอ
func ListMedicalEquipments(c *gin.Context) {

	var medicalEquipment []entity.MedicalEquipment

	if err := entity.DB().Raw("SELECT * FROM medical_equipments").Scan(&medicalEquipment).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": medicalEquipment})

}

// TypeOfUses....................................
func GetTypeOfUse(c *gin.Context) {

	var typeofUse entity.TypeofUse

	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM Typeof_uses WHERE id = ?", id).Scan(&typeofUse).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": typeofUse})

}

// GET /TypeOfUses ดึงทั้งหมดใน DB ของ หมอ
func ListTypeOfUses(c *gin.Context) {

	var typeOfUse []entity.TypeofUse

	if err := entity.DB().Raw("SELECT * FROM Typeof_uses").Scan(&typeOfUse).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": typeOfUse})

}
