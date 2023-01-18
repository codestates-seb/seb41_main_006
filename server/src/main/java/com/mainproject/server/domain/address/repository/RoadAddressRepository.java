package com.mainproject.server.domain.address.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mainproject.server.domain.address.Entity.RoadAddress;

public interface RoadAddressRepository extends JpaRepository<RoadAddress, String> {
}
