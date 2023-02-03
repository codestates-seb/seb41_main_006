package com.mainproject.server.domain.address.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Address {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long address_id;

	@Column(length = 40, nullable = false, unique = true)
	private String beop_jeong_cd;

	@Column(length = 170)
	private String full_address;
}
