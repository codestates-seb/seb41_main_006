package com.mainproject.server.domain.address.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.mainproject.server.domain.address.entity.Address;

public interface AddressRepository extends JpaRepository<Address, Long> {
	@Query("SELECT a.full_address FROM Address a WHERE a.beop_jeong_cd = :beop_jeong_cd")
	String findFullAddressByBeopJeongCd(@Param("beop_jeong_cd") String beop_jeong_cd);
}
