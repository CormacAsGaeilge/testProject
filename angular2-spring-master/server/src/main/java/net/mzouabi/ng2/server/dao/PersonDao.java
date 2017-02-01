package net.mzouabi.ng2.server.dao;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import net.mzouabi.ng2.server.model.Person;

@Repository
public interface PersonDao extends CrudRepository<Person, Long>  {
	
	List<Person> findAll();
	
	Person findPersonById(Long personId);
	
	Person save(Person person);
	
}
