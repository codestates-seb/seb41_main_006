package com.mainproject.server.domain.address.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mainproject.server.domain.address.entity.Address;

public interface AddressRepository extends JpaRepository<Address, Long> {

}
