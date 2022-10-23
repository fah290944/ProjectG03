package entity

import (
	"time"

	"gorm.io/gorm"
)

// สร้างตารางชื่อ Admin
type Admin struct {
	gorm.Model
	// Ausername string
	// Apassword string

	SigninID *uint
	Signin Signin  `gorm:"references:ID"`

	Aname     string
	Tel       string
	// รับข้อมูล Email ที่ไม่ซ้ำกัน
	Email string `gorm:"uniqueIndex"`
	// ส่ง admin_id ไปตาราง Doctor เพื่อเป็น foreignKey
	Doctor []Doctor `gorm:"foreignKey:AdminID"`

}

// สร้างตารางชื่อ MedicalField
type MedicalField struct {
	gorm.Model
	Bname string
	// ส่ง medical_id ไปตาราง Doctor เพื่อเป็น foreignKey
	Doctor []Doctor `gorm:"foreignKey:MedicalFieldID"`
}

// สร้างตารางชื่อ WorkPlace
type WorkPlace struct {
	gorm.Model
	Pname    string
	Paddress string
	// ส่ง workplace_id ไปตาราง Doctor เพื่อเป็น foreignKey
	Doctor []Doctor `gorm:"foreignKey:WorkPlaceID"`
}

// สร้างตารางชื่อ Doctor เป็นตารางหลัก
type Doctor struct {
	gorm.Model
	
	// รับข้อมูล PersonalID ที่ไม่ซ้ำกัน
	PersonalID uint64 `gorm:"uniqueIndex"`
	Name       string
	Position   string
	// รับข้อมูล Email ที่ไม่ซ้ำกัน

	Email       string `gorm:"uniqueIndex"`
	Password    string

	SigninID *uint
	Signin Signin  `gorm:"references:ID"`

	Salary      uint64
	Tel         string
	Gender      string
	DateOfBirth time.Time
	YearOfStart time.Time
	Address     string

	// AdminID ทำหน้าที่เป็น FK
	AdminID *uint
	Admin   Admin `gorm:"references:ID"`

	// WorkPlaceID ทำหน้าที่เป็น FK
	WorkPlaceID *uint
	WorkPlace   WorkPlace `gorm:"references:ID"`

	// MedicalID ทำหน้าที่เป็น FK
	MedicalFieldID *uint
	MedicalField   MedicalField `gorm:"references:ID"`

	//เชื่อมไประบบตารางเวลาแพทย์
	Schedule []Schedule  `gorm:"foreignKey:DoctorID"`

	//เชื่อมไประบบผู้ป่วยในการดูแลของแพทย์
	Patient []Patient `gorm:"foreignKey:DoctorID"`

	Overtimes []Overtime `gorm:"foreignKey:DoctorID"`

	Leave []Leave `gorm:"foreignKey:DoctorID"`

	Borrow []Borrow `gorm:"foreignKey:DoctorID"`


}
