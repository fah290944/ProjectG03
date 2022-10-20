package entity

import (
	"time"

	"gorm.io/gorm"
)

type TypeofUse struct {
	gorm.Model
	Name string

	// MedicalEquipmentID *uint
	MedicalEquipment []MedicalEquipment `gorm:"foreignKey:TypeofUseID"`
}

type MedicalEquipment struct {
	gorm.Model
	Name string

	TypeofUseID *uint
	TypeofUse   TypeofUse

	// BorrowID *uint
	Borrow []Borrow `gorm:"foreignKey:MedicalEquipmentID"`
}


type Worklocation struct {
	gorm.Model
	Name    string
	Address string

	// BorrowID *uint
	Borrow []Borrow `gorm:"foreignKey:WorklocationID"`
}

type Borrow struct {
	gorm.Model
	BorrowDate time.Time
	ReturnDate time.Time
	Quant      int

	DoctorID *uint
	Doctor   Doctor

	MedicalEquipmentID *uint
	MedicalEquipment   MedicalEquipment `gorm:"foreignKey:MedicalEquipmentID;references:ID"`

	WorklocationID *uint
	Worklocation   Worklocation
}