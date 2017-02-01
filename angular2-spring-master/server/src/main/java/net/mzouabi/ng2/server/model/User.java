package net.mzouabi.ng2.server.model;


import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.Date;

@Entity
public class User extends AbstractEntity{
	private static final long serialVersionUID = -6321180910534044216L;
	
	String username;
	String password;
	String firstName;
	String lastName;
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	
	
}
