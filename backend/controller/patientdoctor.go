package controller

import (
	"github.com/fah290944/sa-65-example/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

// POST /patient..........................

func CreatePatient(c *gin.Context) {

	var patient entity.Patient
	var doctor entity.Doctor
	var patienttype entity.PatientType
	var symptoms entity.Symptoms

	if err := c.ShouldBindJSON(&patient); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//9: ค้นหา doctor ด้วย id
	if tx := entity.DB().Where("id = ?", patient.DoctorID).First(&doctor); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "doctor not found"})
		return
	}

	//9: ค้นหา patienttype ด้วย id
	if tx := entity.DB().Where("id = ?", patient.PatientTypeID).First(&patienttype); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "patient_type not found"})
		return
	}

	//9: ค้นหา symptoms ด้วย id
	if tx := entity.DB().Where("id = ?", patient.SymptomsID).First(&symptoms); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "symptoms not found"})
		return
	}

	jj := entity.Patient{
		Doctor:       doctor,               // โยงความสัมพันธ์กับ Entity Resolution
		PatientType:  patienttype,          // โยงความสัมพันธ์กับ Entity Video
		Symptoms:     symptoms,             // โยงความสัมพันธ์กับ Entity Playlist
		PatientsName: patient.PatientsName, // ตั้งค่าฟิลด์ PatientsName
		DateAdmit:    patient.DateAdmit,    // ตั้งค่าฟิลด์ DateAdmit
		Age:          patient.Age,          // ตั้งค่าฟิลด์ Age
	}

	if err := entity.DB().Create(&jj).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": jj})

}

// GET /patient/:id

func GetPatient(c *gin.Context) {

	var patients entity.Patient

	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM patients WHERE id = ?", id).Scan(&patients).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": patients})

}

// GET /patients

func ListPatients(c *gin.Context) {

	var patients []entity.Patient

	if err := entity.DB().Preload("Doctor").Preload("PatientType").Preload("Symptoms").Raw("SELECT * FROM patients").Find(&patients).Error; err != nil {

		//ดึงตารางย่อยมา .preload

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": patients})
}

// GET /patientType..........................................

func ListPatient_type(c *gin.Context) {

	var patienttype []entity.PatientType

	if err := entity.DB().Raw("SELECT * FROM patient_types").Scan(&patienttype).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": patienttype})
}

func GetPatientType(c *gin.Context) {

	var patienttype entity.PatientType

	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&patienttype); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "patienttype not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": patienttype})

}

// GET /symptoms....................................

func ListSymptoms(c *gin.Context) {

	var symptoms []entity.Symptoms

	if err := entity.DB().Raw("SELECT * FROM symptoms").Scan(&symptoms).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": symptoms})
}
func GetSymptoms(c *gin.Context) {

	var symptoms entity.Symptoms
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&symptoms); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Symptoms not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": symptoms})

}

