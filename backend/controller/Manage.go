package controller

import (
	"net/http"

	"github.com/fah290944/sa-65-example/entity"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

// POST /admins...............................
func CreateAdmin(c *gin.Context) {
	var admin entity.Admin
	if err := c.ShouldBindJSON(&admin); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Create(&admin).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": admin})
}

// GET /admin/:id
func GetAdmin(c *gin.Context) {
	var admin entity.Admin
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM admins WHERE id = ?", id).Scan(&admin).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": admin})
}

// GET /admins
func ListAdmins(c *gin.Context) {
	var admins []entity.Admin
	if err := entity.DB().Raw("SELECT * FROM admins").Scan(&admins).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": admins})
}
func SetupPasswordHash(pwd string) string {
	var password, _ = bcrypt.GenerateFromPassword([]byte(pwd), 14)
	return string(password)
}

// POST /Doctors......................................
func CreateDoctor(c *gin.Context) {
	var doctor entity.Doctor
	var admin entity.Admin
	var workplace entity.WorkPlace
	var medicalfield entity.MedicalField
	// var signin entity.Signin

	// 8. จะถูก bind เข้าตัวแปร doctor
	if err := c.ShouldBindJSON(&doctor); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 9. ค้นหา workplace ด้วย id
	if tx := entity.DB().Where("id = ?", doctor.WorkPlaceID).First(&workplace); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "workplace not found"})
		return
	}

	// 10. ค้นหา admin ด้วย id
	if tx := entity.DB().Where("id = ?", doctor.AdminID).First(&admin); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "admin not found"})
		return
	}

	// 11. ค้นหา medicalfield ด้วย id
	if tx := entity.DB().Where("id = ?", doctor.MedicalFieldID).First(&medicalfield); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "medicalfield not found"})
		return
	}

	var userrole entity.UserRole
	if err := entity.DB().Model(&entity.UserRole{}).Where("role_name = ?", "Doctor").First(&userrole).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Doctors role not found"})
		return
	}

	createuserlogin := entity.Signin{
		Username: doctor.Email,
		Password: SetupPasswordHash(doctor.Password),
		UserRole: userrole,
	}

	// 12. สร้าง Doctor
	dt := entity.Doctor{
		Admin:        admin,                              // โยงความสัมพันธ์กับ Entity admin
		WorkPlace:    workplace,                          // โยงความสัมพันธ์กับ Entity workplace
		MedicalField: medicalfield,                       // โยงความสัมพันธ์กับ Entity medicalfield
		PersonalID:   doctor.PersonalID,                  // ตั้งค่าฟิลด์ PersonalID
		Name:         doctor.Name,                        // ตั้งค่าฟิลด์ Name
		Position:     doctor.Position,                    // ตั้งค่าฟิลด์ Position
		Email:        doctor.Email,                       // ตั้งค่าฟิลด์ Email
		Password:     SetupPasswordHash(doctor.Password), // ตั้งค่าฟิลด์ Password
		Salary:       doctor.Salary,                      // ตั้งค่าฟิลด์ Salary
		Tel:          doctor.Tel,                         // ตั้งค่าฟิลด์ Tel
		Gender:       doctor.Gender,                      // ตั้งค่าฟิลด์ Gender
		DateOfBirth:  doctor.DateOfBirth,                 // ตั้งค่าฟิลด์ DateOfBirth
		YearOfStart:  doctor.YearOfStart,                 // ตั้งค่าฟิลด์ YearOfStart
		Address:      doctor.Address,                     // ตั้งค่าฟิลด์ Address
		Signin:       createuserlogin,
	}

	// 13. บันทึก
	if err := entity.DB().Create(&dt).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": dt})
}

// GET /Doctor/:id
func GetDoctor(c *gin.Context) {
	var doctor entity.Doctor
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM doctors WHERE id = ?", id).Scan(&doctor).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": doctor})
}

// GET /Doctors
func ListDoctors(c *gin.Context) {
	var doctors []entity.Doctor

	if err := entity.DB().Preload("Doctor").Preload("WorkPlace").Preload("MedicalField").Raw("SELECT * FROM doctors").Scan(&doctors).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": doctors})
}

// GET /workplaces......................................
func ListWorkplaces(c *gin.Context) {
	var workplaces []entity.WorkPlace
	if err := entity.DB().Raw("SELECT * FROM work_places").Scan(&workplaces).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": workplaces})
}

// GET /medicalfields.............................
func ListMedicalfield(c *gin.Context) {
	var medicalfield []entity.MedicalField
	if err := entity.DB().Raw("SELECT * FROM medical_fields").Scan(&medicalfield).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": medicalfield})
}
