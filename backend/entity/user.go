package entity

import (

	"gorm.io/gorm"
)

type UserRole struct {
    gorm.Model
    RoleName   string

    Doctorlogin []Doctor `gorm:"foreignKey:UserRoleID"`
	Adminlogin []Admin `gorm:"foreignKey:UserRoleID"`
}


