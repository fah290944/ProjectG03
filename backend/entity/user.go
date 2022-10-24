package entity

import (
	"gorm.io/gorm"
)

type UserRole struct {
	gorm.Model
	RoleName string

	Signin []Signin `gorm:"foreignKey:UserRoleID"`
	// Doctorlogin []Doctor `gorm:"foreignKey:UserRoleID"`
	// Adminlogin []Admin `gorm:"foreignKey:UserRoleID"`
}

type Signin struct {
	gorm.Model
	Username string
	Password string

	UserRoleID *uint
	UserRole   UserRole `gorm:"references:ID"`
}




