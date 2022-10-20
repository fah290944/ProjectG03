package controller

import (
	"net/http"

	"github.com/fah290944/sa-65-example/entity"
	"github.com/fah290944/sa-65-example/service"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

// LoginPayload login body
type LoginPayload struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

// DoctorResponse token response
type DoctorResponse struct {
	Token    string        `json:"token"`
	ID       uint          `json:"id"`
	Doctor   entity.Doctor `json:"user"` //สร้างเพื่อ
	RoleName string        `json:"role"`
}

// AdminResponse token response
type AdminResponse struct {
	Token    string       `json:"token"`
	ID       uint         `json:"id"`
	Admin    entity.Admin `json:"user"` //สร้างเพื่อ
	RoleName string       `json:"role"`
}

// POST /login
func Login(c *gin.Context) {
	var payload LoginPayload
	var doctor entity.Doctor
	var admin entity.Admin

	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// ค้นหา doctor ด้วย email ที่ผู้ใช้กรอกเข้ามา
	if err := entity.DB().Raw("SELECT * FROM doctors WHERE email = ?", payload.Email).Scan(&doctor).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ตรวจสอบรหัสผ่าน สิ่งที่เข้ารหัสมาถอดรหัส
	err := bcrypt.CompareHashAndPassword([]byte(doctor.Password), []byte(payload.Password))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "password is incerrect"})
		return
	}

	// กำหนดค่า SecretKey, Issuer และระยะเวลาหมดอายุของ Token สามารถกำหนดเองได้
	// SecretKey ใช้สำหรับการ sign ข้อความเพื่อบอกว่าข้อความมาจากตัวเราแน่นอน
	// Issuer เป็น unique id ที่เอาไว้ระบุตัว client
	// ExpirationHours เป็นเวลาหมดอายุของ token

	jwtWrapper := service.JwtWrapper{
		SecretKey:       "SvNQpBN8y3qlVrsGAYYWoJJk56LtzFHx",
		Issuer:          "AuthService",
		ExpirationHours: 24,
	}

	signedToken, err := jwtWrapper.GenerateToken(doctor.Email)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "error signing token"})
		return
	}

	var AdminRole entity.UserRole
	var DoctorRole entity.UserRole
	entity.DB().Raw("SELECT * FROM user_roles WHERE role_name = ?", "Admin").First(&AdminRole)
	entity.DB().Raw("SELECT * FROM user_roles WHERE role_name = ?", "Doctor").First(&DoctorRole)
	if doctor.UserRole.RoleName == DoctorRole.RoleName {
		if tx := entity.DB().
			Raw("SELECT * FROM doctors WHERE id = ?", doctor.ID).Find(&doctor); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "doctor not found"})
			return
		}

		tokenResponse := DoctorResponse{
			Token:  signedToken,
			ID:     doctor.ID,
			Doctor: doctor,
			RoleName: DoctorRole.RoleName,
		}

		c.JSON(http.StatusOK, gin.H{"data": tokenResponse})
	}else if admin.UserRole.RoleName == AdminRole.RoleName {
		if tx := entity.DB().
			Raw("SELECT * FROM admins WHERE id = ?", admin.ID).Find(&admin); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "admins not found"})
			return
		}

		tokenResponse := AdminResponse{
			Token:  signedToken,
			ID:     admin.ID,
			Admin:  admin,
			RoleName: AdminRole.RoleName,
		}

		c.JSON(http.StatusOK, gin.H{"data": tokenResponse})
		
	}

}
