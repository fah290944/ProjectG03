package entity

import (
	
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {

	return db
}

func SetupDatabase() {

	database, err := gorm.Open(sqlite.Open("g03-65.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	// Migrate the schema
	database.AutoMigrate(
		//จัดการข้อมูลแพทย์ หรือ Manage_Information
		&UserRole{},
		&Admin{},
		&WorkPlace{},
		&MedicalField{},
		&Doctor{},

		//ระบบยืมเครื่องมือแพทย์ หรือ BorrowMed_Equipment 
		&MedicalEquipment{},
		&Worklocation{},
		&Borrow{},

		//ระบบบันทึกข้อมูลล่วงเวลา หรือ OverTime
		&Activity{},
		&Locationwork{},
		&Overtime{},

		//ระบบผู้ป่วยในการดูแลของแพทย์ หรือ Patient_Doctor
		&PatientType{},
		&Symptoms{},
		&Patient{},

		//ระบบตารางเวลาแพทย์ หรือ Schedule
		&MedActivity{},
		&Location{},
		&Schedule{},

		//ระบบลาพักงานของแพทย์ หรือ LeaveMed
		&Type{},
		&Evidence{},
		&Leave{},


	)
	db = database

	SetupIntoDatabase(db)
}