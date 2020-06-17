package com.jatinbuilds.tambola.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Table(name="tambola_games")
@EntityListeners(AuditingEntityListener.class)

public class Tambola {
	
	@Id
	@Column(nullable=false, columnDefinition="varchar(128)")
	private String gameId;

    @Column(name="tambola_numbers", columnDefinition="varchar(300)")
    private String tambolaNumbers;

	@Temporal(TemporalType.TIMESTAMP)
	@LastModifiedDate 
	private Date createdAt;
	
	
	public String getTambolaNumbers() {
		return tambolaNumbers;
	}

	public void setTambolaNumbers(String tambolaNumbers) {
		this.tambolaNumbers = tambolaNumbers;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public String getGameId() {
		return gameId;
	}

	public void setGameId(String gameId) {
		this.gameId = gameId;
	}

}
