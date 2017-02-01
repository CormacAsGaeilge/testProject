package net.mzouabi.ng2.server.service;

import java.util.List;
import net.mzouabi.ng2.server.model.Person;

public interface PersonDBService {
	
		List<Person> findAllPerson();
		
		Person findPersonById(long id);
		
		Person save(Person person);
		
}
